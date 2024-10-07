# HOW TO RUN ON KUBERNETES

## 📝 Requirements
- Docker 27
- Minikube
- Istio

## ⬆️ Steps
1. On this project root folder, start minikube cluster using docker with `minikube start --driver=docker` if you not have it already
2. `kubectl create namespace bff-file-handler` - Create bff-file-handler namespace to keep thing clean
3. `kubectl label namespace bff-file-handler istio-injection=enabled` - Enable istio injection on the namespace
4. `eval $(minikube docker-env)` - Make minikube see local docker images
5. `docker build -t bff-file-handler .` - Build the application
6. `istioctl install --set profile=demo --namespace bff-file-handler` - Install istio ingress, engress, etc
7. `kubectl apply -f kubernetes/ --namespace bff-file-handler` - Create project infrastructure
8. `minikube tunnel` - Tunnel minikube network
9. Open another terminal and export
`export INGRESS_NAME=istio-ingressgateway`
`export INGRESS_NS=istio-system`
`export INGRESS_HOST=$(kubectl -n "$INGRESS_NS" get service "$INGRESS_NAME" -o jsonpath='{.status.loadBalancer.ingress[0].ip}')`
`export INGRESS_PORT=$(kubectl -n "$INGRESS_NS" get service "$INGRESS_NAME" -o jsonpath='{.spec.ports[?(@.name=="http2")].port}')`
`export GATEWAY_URL=$INGRESS_HOST:$INGRESS_PORT`
10. `echo "http://${GATEWAY_URL}/"` - Get the application url

## ↓ Cleanup
1. If you want to only delete the namespace, run `kubectl delete namespace bff-file-handler`
2. If you want to delete the hole cluster, run `minikube delete --profile minikube`
