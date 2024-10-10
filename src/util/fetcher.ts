import delay from "./delay";

enum States {
  CLOSED,
  OPEN,
};

class CircuitBreakerOpen implements Error {
  name: string;
  message = 'Circuit breaker is open';
  stack?: string;
}

class FailedRequest implements Error {
  name: string;
  message = 'Failed request';
  stack?: string;
}

export default class Fetcher {
  private failures = 0;
  private maxFailures = 3;
  private state = States.CLOSED;
  private nextAttempt = Date.now();
  private resetTimeout = 5 * 1000;
  private retries = 3;
  private retryBackoff = 1000;

  public async requestWithCircuitBreaker(url: string) {
    try {
      if (this.state === States.OPEN) {
        if (Date.now() > this.nextAttempt) {
          this.state = States.CLOSED;
        } else {
          throw new CircuitBreakerOpen();
        }
      }

      const response = await this.requestWithRetries(url);

      if (!response.ok) {
        throw new FailedRequest();
      }

      this.reset();
      return response;
    } catch (error) {
      this.increaseFailure();
      throw error;
    }
  }

  private async requestWithRetries(url: string) {
    let attempt = 0;
    while (attempt <= this.retries) {
      try {
        return await fetch(url);
      } catch (err) {
        if (attempt === this.retries) {
          throw err;
        }

        await delay((2 ** attempt) * this.retryBackoff);

        attempt++;
      }
    }
  }

  private reset() {
    this.state = States.CLOSED;
    this.failures = 0;
  }

  private increaseFailure() {
    this.failures++;
    if (this.failures >= this.maxFailures) {
      this.open();
    }
  }

  private open() {
    this.state = States.OPEN;
    this.nextAttempt = Date.now() + this.resetTimeout;
  }
}
