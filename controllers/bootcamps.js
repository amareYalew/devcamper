const ErrorResponse=require('../utills/errorResponse')
const Bootcamp = require('../models/Bootcamp');


// @desc       Get all bootcamps    //
//@route       GET/api/v1/bootcamps
//@access      Public 

// exports.getBootCamps = (req, res, next) => {
//     res.status(200).json({ success: true, msg: 'Shaw all bootcamps'});
// }

exports.getBootCamps =async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.find();
        res.status(200).json({success:true,count:bootcamp.length ,data:bootcamp})
    } catch (err) {
        res.status(400).json({ success: false });
        
    }
   
}


// @desc       Get all bootcamp  single 
//@route       GET/api/v1/bootcamps/:id
//@access      Public 


exports.getBootCamp = async(req, res, next) => {
   try {
       const bootcamp = await Bootcamp.findById(req.params.id);
       if (!bootcamp) {
           return next(
               new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
           );
       }
       res.status(200).json({success:true ,data:bootcamp})
   } catch (error) {
   
       next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`,404))
       
   }
   
}

// @desc       Creat new  bootcamp   
//@route       POST/api/v1/bootcamps
//@access      Private

// exports.createBootCamp = (req, res, next) => {
//     console.log(req.body);
//     res.status(200).json({ success: true, msg: 'Creat new bootcamps' })
  
// }
exports.createBootCamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.create(req.body);
        res.status(201).json({
            success: true,
            data:bootcamp
    
        });
        
    } catch (error) {
        res.status(400).json({
            success: false
        })
        
    }
   
}

// @desc       Update   bootcamp   
//@route       PUT/api/v1/bootcamps/:id
//@access      Private

// exports.updateBootCamp = (req, res, next) => {
//     res.status(200).json({ success: true, msg: `Update bootcamps ${req.params.id}` })
// }

exports.updateBootCamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!bootcamp) {
            return res.status(400).json({ success:false})
        }
    
        res.status(200).json({ success: true, data: bootcamp })
        
    } catch (error) {
        res.status(400).json({ success:false})
    }
    

}

// @desc       Delete all bootcamp   
//@route       DELETE/api/v1/bootcamps/:id
//@access      Privet

// exports.deleteBootCamp = (req, res, next) => {
//     res.status(200).json({ success: true, msg: `Delete bootcamps ${req.params.id}` });
// }
exports.deleteBootCamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id) 
          
        res.status(200).json({ success: true, data: {} })
        
    } catch (error) {
        res.status(400).json({ success:false})
    }
    

}
// we can creat router by express but I do comment out becouse of anther methed ,
// router.get('/', (req, res) => {
//     res.status(200).json({ success: true, msg: 'Shaw all bootcamps' })
// });
// router.get('/:id', (req, res) => {
//     res.status(200).json({ success: true, msg: `Show bootcamps ${req.params.id}` })
// });
// router.post('/', (req, res) => {
//     res.status(200).json({ success: true, msg: 'Creat new bootcamps' })
// });

// router.put('/:id', (req, res) => {
//     res.status(200).json({ success: true, msg: `Update bootcamps ${req.params.id}` })
// });
// router.delete('/:id', (req, res) => {
//     res.status(200).json({ success: true, msg: `Delete bootcamps ${req.params.id}` })
// });