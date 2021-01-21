const Resetter = {
  data: () => ({
    originalData: {}
  }),
  methods: {
    initResetPlugin() {
      this.originalData = Object.assign({}, this.$data);
      delete this.originalData.originalData;
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