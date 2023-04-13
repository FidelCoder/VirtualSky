import React,{ useState } from 'react'
// mui
import { 
    Typography,
    Box,
    Stack,
} from "@mui/material";
// carousel
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
// components
import Title from './Title'
import Paragraph from './Paragraph'


const Gallery = () => {
    
    const [currentIndex, setCurrentIndex] = useState();

    const imageData = [
        {
            alt: 'image1',
            url: 'data:image/jpeg;base64,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'
        },
        {
            alt: 'image2',
            url: 'https://cdn.britannica.com/22/65022-004-1A7CC8C4/Edwin-Aldrin-Jr-surface-Moon-Passive-Seismic.jpg?w=600&q=60'
        },
        {
            alt: "image3",
            url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRipmtfadOUHdiAuKXhuo8TpvrmWPAz1VZKjQ&usqp=CAU'
        },
        {
            alt: "image4",
            url: 'data:image/jpeg;base64,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'
        },
        {
            alt: "image5",
            url: 'data:image/jpeg;base64,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'
        },
    ];
  
    const renderSlides = imageData.map((image) => (
    <div key={image.alt}>
        <img src={image.url} alt={image.alt} />
    </div>
    ));


    const handleChange = (index) => {
        setCurrentIndex(index);
    }

    return (
        <Stack
        direction='column'
        justifyContent= 'center'
        alignItems= 'center'
        sx={{
            py: 8,
            px: 2,
            display: { xs: 'flex'},
        }}
        >
            <Box
            component='section'
            sx={{
                paddingBottom: 3,
            }}
            >
                <Title 
                text={
                    'Galactic plans and dimensions'
                }
                textAlign={'center'}
                />
                <Typography
                variant='h5'
                component='h4'
                align='center'
                sx={{
                    paddingTop: 1,
                }}
                >
                    Places To Explore
                </Typography>
                <Paragraph text={
                    'Explore the vastness of space and discover the scale and magnitude of the universe through our comprehensive plans and measurements, designed to help you navigate through the infinite expanse of the cosmos.'
                } 
                maxWidth = {'sm'}
                mx={'auto'}
                textAlign={'center'}
                />
            </Box>
            
            <Box sx={{ 
                maxWidth: 700,
                width: '100%',
            }}>
                <Carousel
                centerSlidePercentage={40}
                thumbWidth={180}
                dynamicHeight={false}
                centerMode={false}
                showArrows={false}
                autoPlay={false}
                infiniteLoop={true}
                selectedItem={imageData[currentIndex]}
                onChange={handleChange}
                className="carousel-container"
                >
                {renderSlides}
                </Carousel>
            </Box>
        </Stack>
    )
}

export default Gallery