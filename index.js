import Resetter from './src/resetter-mixin';

export default {
  install(vue) {
    vue.mixin(Resetter);
  }
};

export const ResetterMixin =  Resetter;