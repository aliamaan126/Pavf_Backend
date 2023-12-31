import winston from 'winston';

const errorFormat = winston.format((info)=>{
    if(info instanceof Error){
        Object.assign(info,{message:info.stack})
    }
    return info;
})

const logger = winston.createLogger({
    level: process.env.NODE_ENV === 'development' ? 'debug':'info',
    format: winston.format.combine(
        errorFormat(),
        process.env.NODE_ENV === 'development' 
        ? winston.format.colorize()
        : winston.format.uncolorize(),
        winston.format.splat(),
        winston.format.printf(({level,message})=> `${level}: ${message}`)

    ),
    transports:[
        new winston.transports.Console({
            stderrLevels:['error']
        }),
        // new winston.transports.File({
        //     filename:'info.log',
        //     level:"info"
        // }),
        new winston.transports.File({
            filename:'error.log',
            level:"error"
        })
    ]
})


export default logger;