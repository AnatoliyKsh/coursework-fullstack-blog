import React from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';

import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import axios from "../../axios";
import {useNavigate, useParams} from "react-router-dom";

export const AddPost = () => {
    const [text, setText] = React.useState('');
    const {id} = useParams()
    const navigate = useNavigate()
    const [title, setTitle] = React.useState('')
    const [isLoading, setLoading] = React.useState(false)
    const [tags, setTags] = React.useState('')
    const [imageUrl, setImageUrl] = React.useState('')
    const inputFileRef = React.useRef(null)
    const isEditing = Boolean(id)

    /* this function, 'handleChangeFile', handles file input change events. It creates a new
 FormData object, appends the selected file to it, and sends a POST request to the '/upload'
 endpoint. If successful, it updates the state with the received image URL*/
    const handleChangeFile = async (event) => {
        try {
            const formData = new FormData()
            const file = event.target.files[0]
            formData.append('image', file)
            const {data} = await axios.post('/upload', formData)
            setImageUrl(data.url)
        } catch (err) {
            console.warn('err')
        }
    };

    const onClickRemoveImage = () => {
        setImageUrl('')
    };

    const onChange = React.useCallback((value) => {
        setText(value);
    }, []);

    /* this asynchronous function 'onSubmit' is used for creating or updating a post. It sets
 loading state, constructs a payload based on form fields, sends a PATCH or POST request,
 and handles navigation or error logging accordingly */
    const onSubmit = async () => {
        try {
            setLoading(true)
            const fields = {
                title,
                imageUrl, tags, text
            }
            const {data} = isEditing
                ? await axios.patch(`/posts/${id}`, fields)
                : await axios.post('/posts', fields)


            const _id = isEditing ? id : data._id
            navigate(`/posts/${id}`)

        } catch (err) {
            console.log(err)
        }

    }

    /* this useEffect hook is triggered when 'id' changes. It makes an API
    request to fetch post data based on the provided 'id' and updates the
    state with the received data*/
    React.useEffect(() => {
        if (id) {
            axios.get(`/posts/${id}`).then(({data}) => {
                setTitle(data.title)
                setText(data.text)
                setImageUrl(data.imageUrl)
                setTags(data.tags)

            })
        }
    }, [])

    const options = React.useMemo(
        () => ({
            spellChecker: false,
            maxHeight: '400px',
            autofocus: true,
            placeholder: 'Write a text',
            status: false,
            autosave: {
                enabled: true,
                delay: 1000,
            },
        }),
        [],
    );


    return (
        <Paper style={{padding: 30}}>
            <Button onClick={() => inputFileRef.current.click()} variant="outlined" size="large">
                Upload pic
            </Button>
            <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden/>
            {imageUrl && (
                <>
                    <span> </span><Button variant="contained" color="error" onClick={onClickRemoveImage}>
                    Delete
                </Button>
                    <img className={styles.image} src={`http://localhost:4444${imageUrl}`} alt="Uploaded"/>
                </>
            )}

            <br/>
            <br/>
            <TextField
                classes={{root: styles.title}}
                variant="standard"
                placeholder="Title of article"
                value={title}
                onChange={e => setTitle(e.target.value)}
                fullWidth
            />
            <TextField
                value={tags}
                onChange={e => setTags(e.target.value)} classes={{root: styles.tags}} variant="standard"
                placeholder="Tags" fullWidth/>
            <SimpleMDE className={styles.editor} value={text} onChange={onChange} options={options}/>
            <div className={styles.buttons}>
                <Button onClick={onSubmit} size="large" variant="contained">
                    Save
                </Button>
                <a href="/">
                    <Button size="large">Discard</Button>
                </a>
            </div>
        </Paper>
    );
};
