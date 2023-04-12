import React from 'react'
import { 
    Box,
    Grid,
    styled,
    Typography,
} from '@mui/material'
import Title from './Title'
// img
import imgDetail from '../assests/pexels-alex-staudinger-1732414.jpg';
import imgDetail2 from '../assests/pexels-pixabay-271816.jpg';


const GetStarted = () => {

    const CustomGridItem = styled(Grid) ({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    })
    
    const CustomTypography = styled(Typography) ({
        fontSize: '1.1rem',
        textAlign: 'start',
        lineHeight: '1.5',
        color: '#515151',
        marginTop: '1.5rem',
    })

    return (
            
        <Grid container spacing={{ xs: 4, sm: 4, md: 0 }}   
        sx={{
            py: 10,
            px: 2,
             
        }}
        >
            <CustomGridItem item xs={12} sm={8} md={6} 
            component = 'section'
           
            >
                <Box component='article'
                sx={{
                    px: 4,
                }}
                >
                    <Title
                    text={
                        'Cosmic objects: dancing to the rhythm of gravity.'
                    }
                    textAlign={'start'}
                    />
                    <CustomTypography>
                    The universe is a mesmerizing and endlessly fascinating place, filled with stunning cosmic objects that dance to the rhythm of gravity. From the graceful movements of binary stars to the explosive energy of supernovae, these celestial bodies never cease to amaze and inspire us.

That's why we bring you the latest news, updates, and insights into the captivating world of space and astronomy. With our website, you can stay up-to-date with the latest discoveries and developments, and explore the wonders of the universe with us as we uncover the secrets and marvels of the cosmic objects that surround us.
                    </CustomTypography> 
                </Box>

            </CustomGridItem>
            
            <Grid item xs={12} sm={4} md={6}>
                <img src={imgDetail} alt="" 
                style={{
                    width: '100%',
                }}
                />
            </Grid>

            <Grid item xs={12} sm={4} md={6}
            sx={{
                order: {xs: 4, sm: 4, md: 3}
            }}
            >
                <img src={imgDetail2} alt="" 
                style={{ 
                    width: "100%",
                }}
                />
            </Grid>

            <CustomGridItem item xs={12} sm={8} md={6}
            sx={{
                order: {xs: 3, sm: 3, md: 4}
            }}
            >
                <Box component='article'
                sx={{
                    px: 4,
                }}
                >
                    <Title
                    text={
                        'Embark on an intergalactic journey with the best space exploration team by your side'
                        
                    }
                    textAlign={'start'}
                    />
                    <CustomTypography>
                    Join us on an intergalactic journey with the best space exploration team by your side, and discover the wonders of the universe.
                    </CustomTypography>
                </Box>
            </CustomGridItem>
        </Grid>
    )
}

export default GetStarted;