import User from '../model/User'
import { databaseResponseTimeHistogram } from '../utils/metrics'
import { IRegister } from '../types/register.type'
export const register = async (user : IRegister) => {
    const metricsLabels = {
        operation : 'registerUser'
    }
    const timer = databaseResponseTimeHistogram.startTimer()
    try{
        const result = await User.create(user)
        timer({...metricsLabels, success:"true"})
        return result
    }
    catch(err){
        timer({...metricsLabels, success:"false"})
        throw err
    }

}
