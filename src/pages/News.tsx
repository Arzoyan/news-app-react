
import React, { useEffect, useState, Suspense, lazy } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { deleteNewsItemRequest, fetchNewsStart, NewsArticle, searchNewsRequest } from "../features/news/newsSlice";
import { Container, Grid, Card, CardContent, CardMedia, Typography, CircularProgress, TextField, IconButton, Modal, Button } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import { memorizedIsPrime } from '../utils/fibonacci';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';

const EditNewsModal = lazy(() => import('../components/NewsModal'));

const News: React.FC = () => {
    const dispatch = useAppDispatch();
    const { articles, loading, error } = useAppSelector((state) => state.news);
    const [visibleArticles, setVisibleArticles] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [currentArticle, setCurrentArticle] = useState<NewsArticle | null>(null);

    useEffect(() => {
        dispatch(fetchNewsStart());
    }, [dispatch]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const loadMoreArticles = () => {
        setVisibleArticles((prev) => prev + 10);
    };

    const handleDelete = (id: string) => {
        dispatch(deleteNewsItemRequest(id));
    };

    const handleEdit = (article: NewsArticle) => {

        setCurrentArticle(article);
        setIsOpenModal(true);
    };

    const handleAddNew = () => {
        setIsOpenModal(true);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredArticles = () => {
        dispatch(searchNewsRequest(searchTerm));
    }

    return (
        <Container>
            <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleAddNew}
                style={{ marginBottom: '16px', marginTop: '16px' }}
            >
                Add New Post
            </Button>
            <TextField
                label="Search"
                variant="outlined"
                fullWidth
                margin="normal"
                value={searchTerm}
                onChange={handleSearchChange}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        filteredArticles()
                    }
                }}
                style={{ marginBottom: '16px' }}
            />
            <InfiniteScroll
                dataLength={visibleArticles}
                next={loadMoreArticles}
                hasMore={visibleArticles < articles.length}
                loader={<CircularProgress />}
            >
                <Grid container spacing={3}>
                    {articles.slice(0, visibleArticles).map((article) => {
                        return (
                            <Grid item xs={12} sm={6} md={4} key={article.id}>
                                <Card
                                    style={{ border: '1px solid #ccc' }}
                                >
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={article.image}
                                        alt={article.title}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {article.title} - Fibonacci: {article.fibonacci}
                                            {memorizedIsPrime(article.fibonacci) && <CheckIcon style={{ color: 'green', marginLeft: '8px' }} />}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {article.description}
                                        </Typography>
                                        <div>
                                            <IconButton onClick={() => handleEdit(article)}>
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton color="secondary" onClick={() => handleDelete(article.id)}>
                                                <DeleteIcon color={'error'} />
                                            </IconButton>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Grid>
                        );
                    })}
                </Grid>
            </InfiniteScroll>

            <Suspense fallback={<CircularProgress />}>
                <Modal open={isOpenModal} onClose={() => setIsOpenModal(false)}>
                    <EditNewsModal article={currentArticle} onClose={() => setIsOpenModal(false)} />
                </Modal>
            </Suspense>
        </Container>
    );
};

export default News;
