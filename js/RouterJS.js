export function Form(obj) {
  const Field = function Field(key, value) {
    this.uuid = crypto.randomUUID();
    this.key = key;
    this.value = value;
    this.validations = [];
    this.isRequired = function () {
      return this.validations.includes("required");
    };
    this.checks = [];
    this.addCheck = function (f) {
      this.checks.push(f);
    };
    this.setRequired = function (bool) {
      setTimeout(() => {
        if (bool) {
          if (this.isRequired()) return;
          this.validations.push("required");
        } else {
          if (!this.isRequired()) return;
          const index = this.validations.indexOf("required");
          this.validations.splice(index, 1);
        }
        const label = document.getElementById("label_" + this.key) || document.getElementById("label_" + this.uuid);
        if (label) {
          const span = label.querySelector("span");
          if (span) {
            const text = span.innerText.replace(" *", "");
            if (bool) {
              span.innerText = text + " *";
            } else {
              span.innerText = text;
            }
          }
        }
      }, 0);
    };
    this.validate = function () {
      const label = document.getElementById("label_" + this.key) || document.getElementById("label_" + this.uuid);
      if (label) {
        label.classList.remove("valid");
        label.classList.remove("error");
      }
      const checkRequired = function (value) {
        if (value === 0) return true;
        if (value === null || value === "") return false;
        return true;
      };
      this.valid = true;
      for (let validation of this.validations) {
        let aux_valid = true;
        switch (validation) {
          case "required":
            aux_valid = checkRequired(this.value);
            break;
        }
        if (!aux_valid) {
          this.valid = false;
        }
      }
      for (let check of this.checks) {
        let aux_valid = check(this.value);
        if (!aux_valid) {
          this.valid = false;
        }
      }
      setTimeout(() => {
        if (label) {
          if (this.valid) {
            label.classList.add("valid");
            label.classList.remove("error");
          } else {
            label.classList.remove("valid");
            label.classList.add("error");
          }
        }
      }, 0);
      return this.valid;
    };
  };

  const Form = function Form(obj) {
    this.validate = function () {
      let valid = true;
      for (let key in this) {
        if (typeof this[key] === "function") continue;
        if (typeof this[key].validate != "function") continue;
        if (!this[key].validate()) {
          valid = false;
        }
      }
      return valid;
    };
    this.values = function () {
      const values = {};
      for (let key in this) {
        if (typeof this[key] === "function") continue;
        values[key] = this[key].value;
      }
      return values;
    };
    this.setValues = function (obj) {
      for (let key in obj) {
        if (!this[key] || !(this[key] instanceof Field)) {
          this[key] = new Field(key, obj[key]);
        }
        this[key].value = obj[key];
      }
    };
    if (!obj) return;
    for (let key in obj) {
      this[key] = new Field(key, obj[key]);
    }
  };

  // start
  if (!obj) return null;
  if (Array.isArray(obj)) {
    const forms = [];
    for (let item of obj) {
      forms.push(DForm.parse(item));
    }
    return forms;
  }
  if (typeof obj === "object") return new Form(obj);
  return null;
}
