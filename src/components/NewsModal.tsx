import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { addNewsItemRequest, NewsArticle, updateNewsItemRequest } from '../features/news/newsSlice';
import { memorizedFibonacci } from '../utils/fibonacci';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

interface EditNewsModalProps {
    article: NewsArticle | null; // Replace with your article type
    onClose: () => void;
}

const NewsModal: React.FC<EditNewsModalProps> = ({ article, onClose }) => {
    const dispatch = useAppDispatch();

    const initialValues = article
        ? { ...article }
        : { id: `${Date.now()}`, title: '', description: '', image: '', fibonacci: 1 };

    const validationSchema = Yup.object({
        title: Yup.string().required('Title is required'),
        description: Yup.string().required('Description is required'),
        image: Yup.string().url('Invalid URL').required('Image URL is required'),
        fibonacci: Yup.number()
            .required('Fibonacci number is required')
            .min(1, 'Fibonacci number must be greater than 0'),
    });

    const handleSubmit = (data: NewsArticle) => {
        console.log('handleSubmit called');


        if (article) {
            const fibNumber = data.fibonacci !== article.fibonacci ? memorizedFibonacci(Number(data.fibonacci)) : article.fibonacci
            dispatch(updateNewsItemRequest({ ...data, fibonacci: fibNumber }));
        } else {
            dispatch(addNewsItemRequest({ ...data, fibonacci: memorizedFibonacci(Number(data.fibonacci)) }));
        }
        onClose();
    };

    return (
        <Dialog open onClose={onClose}>
            <DialogTitle>Edit News</DialogTitle>
            <DialogContent>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    enableReinitialize={true}
                    onSubmit={(values) => {
                        handleSubmit(values);
                    }}
                >
                    {({ handleChange, values }) => (
                        <Form>
                            <div>
                                <Field
                                    as={TextField}
                                    autoFocus
                                    margin="dense"
                                    label="Title"
                                    name="title"
                                    fullWidth
                                    value={values.title}
                                    onChange={handleChange}
                                />
                                <ErrorMessage name="title" component="div" />
                            </div>
                            <div>
                                <Field
                                    as={TextField}
                                    margin="dense"
                                    label="Description"
                                    name="description"
                                    fullWidth
                                    value={values.description}
                                    onChange={handleChange}
                                />
                                <ErrorMessage name="description" component="div" />
                            </div>
                            <div>
                                <Field
                                    as={TextField}
                                    margin="dense"
                                    label="Image URL"
                                    name="image"
                                    fullWidth
                                    value={values.image}
                                    onChange={handleChange}
                                />
                                <ErrorMessage name="image" component="div" />
                            </div>
                            <div>
                                <Field
                                    as={TextField}
                                    inputProps={{ min: 1 }}
                                    margin="dense"
                                    label="Fibonacci Number"
                                    type="number"
                                    name="fibonacci"
                                    fullWidth
                                    value={values.fibonacci}
                                    onChange={handleChange}
                                />
                                <ErrorMessage name="fibonacci" component="div" />
                            </div>
                            <DialogActions>
                                <Button onClick={onClose} color="secondary">
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    color="primary"
                                >
                                    Save
                                </Button>
                            </DialogActions>
                        </Form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    );
};

export default NewsModal;
