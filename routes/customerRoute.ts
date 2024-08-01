import { Router , Request ,Response, NextFunction } from "express";
import { createCustomer, deleteCustomer, editCustomer, getAllCustomers, getCustomer } from "../controller/customerController.js";
import { Customer } from "../db/entities/Customer-entity.js";
import { AppError } from "../errors/AppError.js";


const router = Router()

router.get('/' , getAllCustomers)

router.get("/:id" , async (req: Request , res: Response , next: NextFunction)=>{
    try {

        const customerId = Number(req.params.id)
        const customer = await getCustomer(customerId)
        res.status(200).json({
            msg: "Customer successfully found",
            Customer: customer
        })

    } catch (error) {
        next(error)
    }
    
})

router.post('/' , async (req: Request , res: Response , next: NextFunction)=>{
    try {
        if(!req.body.mobilePhone || !req.body.name || !req.body.balance){
            throw new AppError("some fields are missing!!" , 400 , true)
        }

        const customer = await createCustomer(req.body)
        res.status(200).json({
            msg: "Customer succssfully created" ,
            customer: customer
        })

    } catch (error) {
        next(error)
    }
    
})

router.delete('/:id' , async (req: Request , res: Response , next: NextFunction)=>{
    try {

        
        const customerId = Number(req.params.id)
        const customer = await deleteCustomer(customerId)
        res.status(200).json({
            msg: "customer successfully deleted",
            deletedCustomer: customer
        })
    } catch (error) {
        next(error)
    }
    
})

router.put('/:id' ,async (req: Request , res: Response , next: NextFunction)=>{
    try {
        const customerId = Number(req.params.id)
        const beforeEditCustomer = await Customer.findOne({where: {id: customerId}})
        const afterEditCustomer = await editCustomer(req.body ,customerId)
        res.status(200).json({
            msg: "customer successfully edited",
            customerBeforeEdit: beforeEditCustomer ,
            customerAfterEdit: afterEditCustomer
        })
    } catch (error) {
        next(error)
    }
    
})





export default router