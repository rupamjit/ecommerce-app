import categoryModel from "../models/categoryModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const createCategory = asyncHandler(async (req,res)=>{
    try {
        const {name} = req.body;
        if(!name) {
            return res.json({error:"Name is required"});
        }
        const findName = await categoryModel.findOne({name});
        if(findName){
            res.json({message:`Category is already exist!!!`});
            return;
        }
        const category = await  categoryModel.create({name})
        return res.status(200).json(category);
    } catch (error) {
        console.log(error);
        res.status(400).json({message:error.message});
    }
})


const updateCategory = asyncHandler(async (req, res) => {
    try {
      const { name } = req.body;
      const { categoryId } = req.params;
  
      const category = await categoryModel.findOne({ _id: categoryId });
  
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }
  
      category.name = name;
  
      const updatedCategory = await categoryModel.save();
      res.json(updatedCategory);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
  const removeCategory = asyncHandler(async (req, res) => {
    try {
      const removed = await categoryModel.findByIdAndRemove(req.params.categoryId);
      res.json(removed);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
  const listCategory = asyncHandler(async (req, res) => {
    try {
      const all = await Category.find({});
      res.json(all);
    } catch (error) {
      console.log(error);
      return res.status(400).json(error.message);
    }
  });
  
  const readCategory = asyncHandler(async (req, res) => {
    try {
      const category = await categoryModel.findOne({ _id: req.params.id });
      res.json(category);
    } catch (error) {
      console.log(error);
      return res.status(400).json(error.message);
    }
  });
  
  export {
    createCategory,
    updateCategory,
    removeCategory,
    listCategory,
    readCategory,
  };