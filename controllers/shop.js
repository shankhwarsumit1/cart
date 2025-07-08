const deleteItem = async(productId)=>{
   
    const updateCartItems =  this.cart.items.filter(item=>{
    return item.productId.toString() != productId.toString();
   });

   const db = getDb();
   return db
      .collection('users')
      .updateOne(
        {_id:new ObjectId(this.id)},
        {$set :{cart:{items:updatedCartItems}}}
      )
}