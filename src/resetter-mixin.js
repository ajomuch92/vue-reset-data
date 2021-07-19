const Resetter = {
  data: () => ({
    $originalData: {}
  }),
  methods: {
    initResetPlugin() {
      this.$originalData = this.$clone(this.$data);
    },
    $clone(object) {
      const cloning = {};
      Object.keys(object).map(prop => {
        if(prop === '$originalData')
          return;
        const obj = object[prop];
        if(obj === null) {
          cloning[prop] = null;
        } else if(obj === undefined) {
          cloning[prop] = undefined;
        } else if(Array.isArray(obj)) {
          const arr = [];
          for(const o of obj) {
            arr.push(this.$clone(o))
          }
          cloning[prop] = arr;
        } else if(typeof obj === 'object') {
          cloning[prop] = this.$clone(obj);
        } else if (obj instanceof Date) {
          cloning[prop] = new Date(obj.getTime());
        } else if (typeof obj === 'function') {
          cloning[prop] = obj.bind();
        } else cloning[prop] = obj;
      });
      return cloning;
    },
    resetData(keys) {
      const originalKeys = Object.keys(this.$originalData);
      if(keys == null) {
        const clone = this.$clone(this.$originalData);
        for(const k of originalKeys) {
          this.$data[k] = clone[k];
        }
      } else if(Array.isArray(keys)) {
        const clone = this.$clone(this.$originalData);
        for(const k of keys) {
          if(typeof k == 'string' && originalKeys.includes(k)) {
            this.$data[k] = clone[k];
          }
        }
      } else if(typeof keys === 'string' && originalKeys.includes(keys)) {
        const clone = this.$clone(this.$originalData);
        this.$data[keys] = clone[keys];
      } else {
        return;
      }
    }
  }
};

export default Resetter;