import Manager from '../manager';

export default abstract class {
    abstract setup(manager: Manager): any;
    abstract updateConfig(): any;
}
