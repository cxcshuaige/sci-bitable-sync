import { join } from "path";
class Dir{
    pwd = process.cwd();
    rootPath(...args) {
        return join(this.pwd, ...args);
    }
}
export default Dir;