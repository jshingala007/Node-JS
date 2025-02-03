const addpage =(req,res)=>{
    return res.render('Crud/add');
}

const viewpage =(req,res)=>{
    return res.render('Crud/view');
}

module.exports={
    addpage,viewpage
}