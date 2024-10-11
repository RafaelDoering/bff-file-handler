export default interface AvatarPort {
  get(hash: string): Promise<string>;
}
