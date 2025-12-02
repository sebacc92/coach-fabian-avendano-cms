// src/index.ts
export default {
  register({ strapi }) {
    // Obtener el plugin
    const plugin = strapi.plugin('users-permissions');

    // Modificar el controller
    const originalRegister = plugin.controllers.auth.register;

    plugin.controllers.auth.register = async (ctx) => {
      const { body } = ctx.request;

      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 7);

      ctx.request.body = {
        ...body,
        is_trial: true,
        plan_type: 'gratis',
        plan_expiration: expirationDate.toISOString(),
        confirmed: true
      };

      return await originalRegister(ctx);
    };
  },

  bootstrap({ strapi }) {
    // Se ejecuta DESPUÉS de que todo esté cargado
    // Útil para lógica de inicialización
  },
};