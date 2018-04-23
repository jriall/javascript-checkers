import ModuleOne from './modules/module-one.js';

class App {
  constructor() {
    console.log('This is working just fine!');
    this.moduleOne = new ModuleOne();
  }
}

window.addEventListener('load', () => new App());