const Resetter = {
  data: () => ({
    originalData: {}
  }),
  methods: {
    initResetPlugin() {
      this.originalData = this.$clone(this.$data);
      delete this.originalData.originalData;
    },
    $clone(object) {
      const cloning = {};
      Object.keys(object).map(prop => {
        if(prop === 'originalData')
          return;
        const obj = this.$data[prop];
        if(Array.isArray(obj)) {
          cloning[prop] = [...obj]
        } else if(typeof obj === 'object') {
          cloning[prop] = this.$clone(obj)
        } else if (obj instanceof Date) {
          cloning[prop] = new Date(obj.getTime());
        } else if (typeof obj === 'function') {
          cloning[prop] = obj.bind();
        } else cloning[prop] = obj
      });
      return cloning
    },
    resetData(keys) {
      if(keys == null) {
        const originalKeys = Object.keys(this.originalData);
        for(const k of originalKeys) {
          this.$data[k] = this.originalData[k];
        }
      } else if(Array.isArray(keys)) {
        const originalKeys = Object.keys(this.originalData);
        for(const k of keys) {
          if(typeof k == 'string' && originalKeys.includes(k)) {
            this.$data[k] = this.originalData[k];
          }
        }
      } else {
        return;
      }
    }
  }
};

export default Resetter;