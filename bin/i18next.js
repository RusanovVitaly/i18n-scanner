#! /usr/bin/env node
import gulp from 'gulp'
import scanner,{Parser} from 'i18next-scanner'

const paths = [
    './src/*.{js,ts,tsx}', './src/**/*.{js,ts,tsx}', './src/**/**/*.{js,ts,tsx}', './src/**/**/**/*.{js,ts,tsx}',
    './src/**/**/**/**/*.{js,ts,tsx}',
];

const task = gulp.task('i18next', async function () {
    console.log("Collecting translations started....");
    await new Promise((resolve) => {
        gulp.src(paths)
            .pipe(scanner({
                lngs: ['en','ru','de','it','es'],
                debug: true,
                removeUnusedKeys: false,
                func: {
                    list: ['t', 'i18n.t'],
                    extensions: ['.js', '.jsx', '.ts', '.tsx'],
                },
                resource: {
                    loadPath: './translations/trns.json',
                    savePath: '{{ns}}.json'
                },
                keySeparator: null
            }))
            .pipe(gulp.dest('assets'))
            .on("end", resolve)
    })
    console.log("Collecting translations successfully ended!");
});
gulp.parallel('i18next')();

export default task;