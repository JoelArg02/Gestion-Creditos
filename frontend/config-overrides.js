module.exports = function override(config, env) {
    // Agregar un cargador para archivos PDF
    config.module.rules.push({
        test: /\.pdf$/,
        use: 'file-loader',
    });

    return config;
};
