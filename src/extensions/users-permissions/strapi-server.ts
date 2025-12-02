export default (plugin: any) => {
    console.log('>>> EXTENSION users-permissions CARGADA');

    // Guardamos la función original de registro
    const originalRegister = plugin.controllers.auth.register;

    // Sobreescribimos la función 'register'
    plugin.controllers.auth.register = async (ctx: any) => {
        console.log('>>> register interceptado');

        // Obtenemos los datos del body
        const { body } = ctx.request;

        // --- LÓGICA DE PRUEBA GRATIS (7 DÍAS) ---
        const today = new Date();
        const trialDays = 7;
        const expirationDate = new Date(today);
        expirationDate.setDate(today.getDate() + trialDays);

        // Inyectamos los campos en el body ANTES de crear el usuario
        ctx.request.body = {
            ...body,
            plan_expiration: expirationDate.toISOString(), // Mejor formato ISO
            is_trial: true,
            plan_type: 'gratis',
            confirmed: true // Si quieres auto-confirmar
        };

        console.log('>>> Datos a registrar:', ctx.request.body);

        // Ejecutamos la función original de Strapi
        const response = await originalRegister(ctx);

        console.log('>>> Usuario creado exitosamente');

        return response;
    };

    return plugin;
};