import React from 'react'
import {Editor} from '@tinymce/tinymce-react'
import {Controller} from 'react-hook-form'

// this control parameter is only responsible to forward all the data into form Data and this ccontrol is passed when this RTE is used
export default function RTE({name, control, label, defaultValue=""}) {
  return (
    <div className='w-full'>
        {label && <label className='inline-block mb-1 pl-1'>{label}</label>}
      
        <Controller
        name= {name|| "Description about the image/author"}
        control={control}
        render = {({field:{onChange}}) => (
            <Editor
            apiKey='v6v37zxvj77w7eyp0bptuvvf1mh7mhbj39wo60pi0m19lku1'
            initialValue={defaultValue}
            init={{
                selector: 'textarea',
                initialValue:defaultValue,
                height:250,
                menubar:true,
                plugins:[
                    "image",
                    "advlist",
                    "autolink",
                    "lists",
                    "link",
                    "image",
                    "charmap",
                    "preview",
                    "anchor",
                    "searchreplace",
                    "visualblocks",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "code",
                    "help",
                    "wordcount",
                    "anchor",
                ],
                toolbar:
                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                
                content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
            }}  
            onEditorChange={onChange}
            />
        )}
        />
    </div>
  )
}


