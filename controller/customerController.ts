import { Customer } from "../db/entities/Customer-entity.js"
import {Request , Response} from "express"
import { AppError } from "../errors/AppError.js"

const getAllCustomers = async (req: Request , res: Response)=>{
    const customers = await Customer.find()
    res.status(200).json({
        msg: "All Customers",
        Customers: customers
    })
}

const getCustomer = async (customerId: number)=>{
    
    const customer = await Customer.findOne({where: {id :customerId}})
    if(!customer){
        throw new AppError("Customer does not exist" , 404 , true)
    }

    return customer
}

const createCustomer = async (payload: Customer)=>{
    const customer = await Customer.findOne({where: {mobilePhone: payload.mobilePhone}})
    if(customer){
        throw new AppError("Customer with this phone number already exist!!" , 409 , true)
    }

    const newCustomer = Customer.create(payload).save()
    return newCustomer
}

const deleteCustomer = async (customerId: number)=>{

    const customer = await Customer.findOne({where: {id: customerId}})
    if(!customer){
        throw new AppError("Customer does not exist" , 404 , true)
    }

    return customer.remove()
}

const editCustomer = async (payload:Customer , customerId: number)=>{      //what if we send a not copmplete Customer object!!
    const customer = await Customer.findOne({where: {id: customerId}})
    if(!customer){
        throw new AppError("there's no customer with that id to edit" , 404 , true)
    }

    if(payload.mobilePhone){
        const searchForUniqness = await Customer.findOne({where: {mobilePhone: payload.mobilePhone}})
        if(JSON.stringify(searchForUniqness) == JSON.stringify(customer)){
            throw new AppError("ur using thie phone number already" , 409 , true)
        }

        if(searchForUniqness){
            throw new AppError("theres already exist a customer with this phone number , you cant edit ur phone number to this phone number!!" , 409 , true)
        }
        customer.mobilePhone = payload.mobilePhone
    }

    if(payload.name){
        customer.name = payload.name
    }

    if(payload.balance){
        customer.balance = payload.balance
    }

    return customer.save()
}

export {getAllCustomers , getCustomer, createCustomer , deleteCustomer , editCustomer}