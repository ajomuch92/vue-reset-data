const Resetter = {
  data: () => ({
    $originalData: {}
  }),
  methods: {
    initResetPlugin() {
      this.$originalData = this.$clone(this.$data);
      delete this.$originalData.originalData;
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
          cloning[prop] = [...obj];
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
        for(const k of originalKeys) {
          this.$data[k] = this.$originalData[k];
        }
      } else if(Array.isArray(keys)) {
        for(const k of keys) {
          if(typeof k == 'string' && originalKeys.includes(k)) {
            // this.$data[k] = this.$originalData[k];
            this.$set(this.$data, k, this.$originalData[k]);
          }
        }
      } else if(typeof keys === 'string' && originalKeys.includes(keys)) {
        // this.$data[keys] = this.$originalData[keys];
        this.$set(this.$data, keys, this.$originalData[keys]);
      } else {
        return;
      }
    }
  }
};

export default Resetter;