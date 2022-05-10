import User from '../model/User'
import { databaseResponseTimeHistogram } from '../utils/metrics'

export const createUser = async (firstName : string, lastName : string, email : string) => {
    const metricsLabels = {
        operation : 'createUser'
    }
    const timer = databaseResponseTimeHistogram.startTimer()
    try{
        const result = await User.create({firstName, lastName, email})
        timer({...metricsLabels, success:"true"})
        return result
    }
    catch(err){
        timer({...metricsLabels, success:"false"})
        throw err
    }

}
