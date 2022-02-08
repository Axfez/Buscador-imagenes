import { Formik, Form, Field } from 'formik'
import './header.css'
import './content.css'
import './article.css'
import { useState } from 'react'

function App() {
  const [photos, setPhotos] = useState([])
  const open = url => window.open(url)
  console.log({ photos })

  return (
    <div>
      <header>
        <Formik
          initialValues={{ search: '' }}
          onSubmit={async values => {
            const response = await fetch(`https://api.unsplash.com/search/photos?per_page=30&query=${values.search}`, {
              headers: {
                'Authorization': 'Client-ID GfW3ebHRzGN8-ljIfNBzW_ZOIoGDK767B_NmKTlBKas'
              }
            })
            const data = await response.json()
            //llamar a api de unsplash
            setPhotos(data.results)
          }}
        >
          <Form>
            <Field name="search" />
          </Form>
        </Formik>
      </header>
      <div className='container'>
        <div className='center'>
          {photos.map(photo =>
            <article key={photo.id} onClick={() => open(photo.links.html)}>
              <img src={photo.urls.regular} alt={photo.id} />
              <p>{[photo.description, photo.alt_description].join(' - ')}</p>
            </article>)}
        </div>
      </div>
    </div>
  );
}

export default App;
