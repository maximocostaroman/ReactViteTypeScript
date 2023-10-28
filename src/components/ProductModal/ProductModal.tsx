import React from 'react'
import { ModalType } from '../../types/ModalType';
import { Product } from '../../types/Product';
import Modal from 'react-bootstrap/esm/Modal';
import * as YUP from "yup";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { ProductService } from '../../services/ProductService';
import { FormLabel } from 'react-bootstrap';
import { useFormik } from 'formik';
import{toast} from 'react-toastify';

type ProductModalProps = {
    show:boolean;
    onHide:() => void;
    title:string;
    modalType:ModalType;
    prod:Product;
    refreshData: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProductModal = ({show,onHide,title,modalType,prod,refreshData }:ProductModalProps) => {

    const handleSaveUpdate = async(pro:Product) =>{
        try{
            const isNew = prod.id === 0;
            if(isNew){
                await ProductService.createProduct(pro);
            } else{
                await ProductService.updateProduct(pro.id,pro);
            }
            toast.success(isNew ? "Producto creado" : "Producto actualizado", {
                position: "top-center",
            })
            onHide();
            refreshData(prevState => !prevState);
        }catch(error){
            console.error(error);
            toast.error("Ha ocurrido un error D:");
        }
    };
    
    const handleDelete = async () => {
        try{
            await ProductService.deleteProduct(prod.id);
            toast.success("Producto eliminado con exito",{
                position: "top-center",
            });
            onHide();
            refreshData(prevState => !prevState);
        } catch(error){
            console.error(error);
            toast.error("Ha ocurrido un error D:");
        }
    }

    const validationSchema = () => {
        return YUP.object().shape({
            id: YUP.number().integer().min(0),
            title:YUP.string().required('el titulo es requerido'),
            price: YUP.number().min(0).required('El precio es requerida'),
            description:YUP.string().min(0).required('La descripcion es requerida'),
            category: YUP.string().required('La categoria es requerida'),
            image: YUP.string().required('La URL de la limg es requerida'),
        });
    };

    const formik = useFormik({
        initialValues:prod,
        validationSchema:validationSchema(),
        validateOnChange:true,
        validateOnBlur:true,
        onSubmit: (obj:Product) => handleSaveUpdate(obj),
    })

    return (
    <>
    {modalType === ModalType.DELETE}(
        <Modal show={show} onHide={onHide} centered backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Esta seguro?
                    <br /> <strong>{prod.title}</strong> ?
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Canclar
                </Button>
                <Button variant="danger" onClick={handleDelete}>
                    Borrar
                </Button>
            </Modal.Footer>
        </Modal>
    ) : (
        <> <Modal show={show} onHide={onHide} centered backdrop="static" className="modal-x1">
            <Modal.Header>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={formik.handleSubmit}>
                    <Form.Group controlId="formTitulo">
                        <FormLabel> Titulo</FormLabel>
                        <Form.Control
                        name="title"
                        type="text"
                        value={formik.values.title || ''}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={Boolean(formik.errors.title && formik.touched.title)}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.title}
                        </Form.Control.Feedback>
                    </Form.Group>

                    {"Precio"}
                    <Form.Group controlId="formPrice">
                        <FormLabel> Precio</FormLabel>
                        <Form.Control
                        name="title"
                        type="text"
                        value={formik.values.price || ''}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={Boolean(formik.errors.price && formik.touched.price)}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.price}
                        </Form.Control.Feedback>
                    </Form.Group>

                    {"Descrip"}
                    <Form.Group controlId="formDescription">
                        <FormLabel> Descripcion</FormLabel>
                        <Form.Control
                        name="title"
                        type="text"
                        value={formik.values.description || ''}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={Boolean(formik.errors.description && formik.touched.description)}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.description}
                        </Form.Control.Feedback>
                    </Form.Group>

                    {"Categoria"}
                    <Form.Group controlId="formCategory">
                        <FormLabel> Categoria</FormLabel>
                        <Form.Control
                        name="title"
                        type="text"
                        value={formik.values.category || ''}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={Boolean(formik.errors.category && formik.touched.category)}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.category}
                        </Form.Control.Feedback>
                    </Form.Group>

                    {"Imagen"}
                    <Form.Group controlId="formImage">
                        <FormLabel> Imagen</FormLabel>
                        <Form.Control
                        name="title"
                        type="text"
                        value={formik.values.image || ''}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={Boolean(formik.errors.image && formik.touched.image)}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.image}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Modal.Footer className="mt-4">
                        <Button variant="secondary" onClick={onHide}>
                            cancelar
                        </Button>
                        <Button variant='primary' type='submit' disabled={!formik.isValid}>
                            Guardar
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
            </Modal>
        </>
    )
    </>
  )
}

export default ProductModal

