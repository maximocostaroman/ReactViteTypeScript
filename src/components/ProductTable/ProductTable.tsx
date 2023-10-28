import { useEffect, useState } from 'react'
import { Product } from '../../types/Product';
import { ProductService } from '../../services/ProductService';
import Loader from '../Loader/Loader';
import { Table } from 'react-bootstrap';
import { ModalType } from '../../types/ModalType';
import ProductModal from '../ProductModal/ProductModal';
import EditButton from '../DeleteButton/DeleteButton';
import DeleteButton from '../DeleteButton/DeleteButton';



const ProductTable = () => {
    const[Products,setProducts]=useState<Product[]>([]);

    const[isLoading,setisLoading]=useState(true);

    const[refreshData,setrefreshData] = useState(false);

    useEffect( () => {
        const fetchProducts =async () => {
            const Products = await ProductService.getProducts();
            setProducts(Products);
            setisLoading(false);
        }
        fetchProducts();
    },[refreshData]);

    console.log(JSON.stringify(Products,null,2));

    const initializableNewProduct = (): Product => {
        return{
            id:0,
            title:"",
            price:0,
            description:"",
            category:"",
            image:"",
        };
    };
    
    const [product,setProduct]=useState<Product>(initializableNewProduct);
    
    const[showModal,setshowModal]=useState(false);
    const[modalType,setmodalType]=useState<ModalType>(ModalType.NONE);
    const[Title,setTitle]=useState("");
    
    const handleClick=(newTitle:string, prod:Product, modal:ModalType)=>{
    setTitle(newTitle);
    setmodalType(modal);
    setProduct(prod);
    setshowModal(true);
    }
  return (
        <> 
            <button onClick={() => handleClick("Nuevo Producto", initializableNewProduct(),ModalType.CREATE)}> Nuevo producto</button>
            {isLoading ? <Loader/> : (
                <Table hover>
                    <thead>
                        <tr>
                            <th>Titulo</th>
                            <th>Precio</th>
                            <th>Descrip</th>
                            <th>Cat</th>
                            <th>imagen</th>
                            <th>Editar</th>
                            <th>Borrar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Products.map(product => (
                            <tr key={product.id}>
                                <td>{product.title}</td>
                                <td>{product.price}</td>
                                <td>{product.description}</td>
                                <td><img src={product.image} alt={product.image} style={{width:'50px'}}/></td>
                                <td><EditButton onClick={()=> handleClick("EditarProducto", product, ModalType.UPDATE)}/></td>
                                <td><DeleteButton onClick={()=> handleClick("EditarProducto", product, ModalType.DELETE)}/></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                )}
                {showModal &&(
                    <ProductModal
                    show={showModal}
                    onHide={()=> setshowModal(false)}
                    title={Title}
                    modalType={modalType}
                    prod={product}
                    refreshData={setrefreshData}
                    />
                )

                }
        </>
     )
}

export default ProductTable