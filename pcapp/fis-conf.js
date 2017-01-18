fis.hook('relative');

fis.match('**', {
    relative: true
});

fis.match('/script/*.js', {
    useHash: true,
    optimizer: fis.plugin('uglify-js')
});

fis.match('/style/*.css', {
    relative: true,
    useHash: true,
    optimizer: fis.plugin('clean-css'),
})

fis.match('*.png', {
    optimizer: fis.plugin('png-compressor')
});
