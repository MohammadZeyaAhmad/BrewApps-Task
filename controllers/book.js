const Book=require("../models/Book");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const createBook=async(req,res)=>{
    try{
    const result=await Book.create(req.body);
      res.status(StatusCodes.CREATED).json({ result });
    }catch(err)
    {
     return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg:err.message });
    }
   
}

const updateBook = async (req, res) => {
  let entry=await Book.findOne({_id:req.params.id});
  if(!entry) 
  {
    throw new CustomError.BadRequestError(`No entry found for book id ${req.params.id}`);
  }
  try{
  let result = await Book.findOneAndUpdate({ _id: entry._id }, req.body, {
    new: true,
    runValidators:true,
  });
  res.status(StatusCodes.CREATED).json({ result });
}catch(err)
{
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ msg: err.message });
}
  
};

const deleteBook = async (req, res) => {
  let entry = await Book.findOne({ _id: req.params.id });
  if (!entry) {
    throw new CustomError.BadRequestError(
      `No entry found for book id ${req.params.id}`
    );
  }
  try {
    await Book.findOneAndDelete({ _id: entry._id });
    res.status(StatusCodes.CREATED).json({ result:"Entry Deleted" });
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: err.message });
  }
}

const getBookById = async (req, res) => {
   let result = await Book.findOne({ _id: req.params.id });
    if (!result) {
      throw new CustomError.BadRequestError(
        `No entry found for book id ${req.params.id}`
      );
    }
 
  res.status(StatusCodes.OK).json({ result });
};

const getAllBooks = async (req, res) => {
     result = await Book.find({});
     res.status(StatusCodes.OK).json({ result });
};




module.exports = {
 createBook,
 updateBook,
 deleteBook,
 getBookById,
 getAllBooks
};