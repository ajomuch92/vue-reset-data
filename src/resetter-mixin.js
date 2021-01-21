const Resetter = {
  data: () => ({
    _originalData: {}
  }),
  methods: {
    initResetPlugin() {
      this._originalData = Object.assign({}, this.$data);
      delete this._originalData._originalData;
    },
    resetData(keys) {
      if(keys == null) {
        const originalKeys = Object.keys(this._originalData);
        for(const k of originalKeys) {
          this.$data[k] = this._originalData[k];
        }
      } else if(Array.isArray(keys)) {
        const originalKeys = Object.keys(this._originalData);
        for(const k of keys) {
          if(typeof k == 'string' && originalKeys.includes(k)) {
            this.$data[k] = this._originalData[k];
          }
        }
      } else {
        return;
      }
    }
  }
};

export default Resetter;