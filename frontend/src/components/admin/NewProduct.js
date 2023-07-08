import React, { Fragment, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNewProductMutation } from '../../features/APIslices/productApi'

const NewProduct = () => {
  const dispatch = useDispatch()  
  const [newProduct, data] = useNewProductMutation()
  console.log('hello', newProduct, data)
  
 const [name, setName] = useState('');
const [price, setPrice] = useState(0);
const [description, setDescription] = useState('');
const [category, setCategory] = useState('');
const [stock, setStock] = useState(0);
const [seller, setSeller] = useState('');
const [images, setImages] = useState([]);
const [imagesPreview, setImagesPreview] = useState([])

const categories = [
    'Electronics',
    'Cameras',
    'Laptops',
    'Accessories',
    'Headphones',
    'Food',
    "Books",
    'Clothes/Shoes',
    'Beauty/Health',
    'Sports',
    'Outdoor',
    'Home'
]


const submitHandler=(e)=>{
  e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('category', category);
        formData.append('stock', stock);
        formData.append('seller', seller);
    console.log('formData', formData)
    newProduct(formData)
}

  return (
    <div className="col-12 col-md-10">
      
                    <Fragment>
                        <div className="wrapper my-5">
                        <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>

                        {/* <form className="shadow-lg"  encType='multipart/form-data'> */}
                                <h1 className="mb-4">New Product</h1>

                                <div className="form-group">
                                    <label htmlFor="name_field">Name</label>
                                    <input
                                        type="text"
                                        name='name'
                                        id="name_field"
                                        className="form-control"
                                        
                                      
                                     onChange={(e) => setName(e.target.value)} 
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="price_field">Price</label>
                                    <input

                                        type="text"
                                        name='price'
                                        id="price_field"
                                        className="form-control"
                                        value={price}
                                        // onChange={handleAddFormChange}

                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="description_field">Description</label>
                                    <textarea className="form-control" id="description_field" rows="8" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                                    {/* <textarea name='description' className="form-control" id="description_field" rows="8"     onChange={handleAddFormChange}></textarea> */}

                                </div>

                                <div className="form-group">
                                    <label htmlFor="category_field">Category</label>
                                    <select className="form-control" id="category_field" value={category} onChange={(e) => setCategory(e.target.value)}>
                                        {categories.map(category => (
                                            <option key={category} value={category} >{category}</option>
                                        ))}

                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="stock_field">Stock</label>
                                    <input
                                        type="number"
                                        name='stock'
                                        id="stock_field"
                                        className="form-control"
                                        value={stock}
                                        // onChange={handleAddFormChange}
                                        onChange={(e) => setStock(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="seller_field">Seller Name</label>
                                    <input
                                        type="text"
                                        id="seller_field"
                                        className="form-control"
                                        value={seller}
                                        onChange={(e) => setSeller(e.target.value)}
                                    />
                                </div>

                                {/* <div className='form-group'>
                                    <label>Images</label>

                                    <div className='custom-file'>
                                        <input
                                            type='file'
                                            name='product_images'
                                            className='custom-file-input'
                                            id='customFile'
                                            onChange={onChange}
                                            multiple
                                        />
                                        <label className='custom-file-label' htmlFor='customFile'>
                                            Choose Images
                                     </label>
                                    </div>

                                    {imagesPreview.map(img => (
                                        <img src={img} key={img} alt="Images Preview" className="mt-3 mr-2" width="55" height="52" />
                                    ))}

                                </div> */}


                                <button
                                    id="login_button"
                                    type="submit"
                                    className="btn btn-block py-3"
                                    // disabled={loading ? true : false}
                                >
                                    CREATE
                                </button>

                            </form>
                        </div>
                    </Fragment>
                </div>
  )
}

export default NewProduct