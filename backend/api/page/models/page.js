"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#lifecycle-hooks)
 * to customize this model
 */

const slugify = require("slugify");

// Strips out special characters from the title to make it url-friendly

module.exports = {
  lifecycles: {
    beforeCreate: async (data) => {
      console.log(data, "ini datanya dimodel");
      if (data.slug) {
        data.slug = slugify(data.slug, { lower: true });
      } else if (data.title) {
        data.slug = slugify(data.title, { lower: true });
      }
    },
    beforeUpdate: async (params, data) => {
      if (data.slug) {
        data.slug = slugify(data.slug, { lower: true });
      } else if (data.title) {
        data.slug = slugify(data.title, { lower: true });
      }
    },
  },
};
