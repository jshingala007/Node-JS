const addproduct=(req,res)=>{
    return res.render('Product/add');
}

const viewproduct =(req,res)=>{
    return res.render('Product/view');
}

module.exports={
    addproduct,viewproduct
}