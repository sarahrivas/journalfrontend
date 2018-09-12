import React, { Component } from 'react';
import { connect } from 'react-redux';
import { storeAllEntries } from '../actions'
import { withStyles, classes } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';


const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
});

class Home extends Component {

  state = {
    tileData : [
       {
         img: "http://www.blurb.com/blog/wp-content/uploads/2017/10/201802_CookbookTips_02-Layouts.jpg",
         title: 'Save your favorite recipes',
         featured: true,
       },
       {
         img: "https://livekindlyproduction-8u6efaq1lwo6x9a.stackpathdns.com/wp-content/uploads/2018/01/cookbook-1-1280x640.jpg",
         title: 'Food',
         author: 'author',
         featured: true,
       },
       {
         img: "https://144f2a3a2f948f23fc61-ca525f0a2beaec3e91ca498facd51f15.ssl.cf3.rackcdn.com/uploads/food_portal_data/articles/article/hero_article_image/474/compressed_letterbox_RESIZEsmashedchickpeas.jpg",
         title: 'Food',
         author: 'author',
         featured: true,
       },
       {
         img: "https://ksr-ugc.imgix.net/assets/019/059/828/35a89f9105c54bb0bdbe597b3cb1dca6_original.jpg?w=639&fit=max&v=1509778957&auto=format&q=92&s=1ed3db275f21fcce527c63c577c41550",
         title: 'Food',
         author: 'author',
         featured: true,
       },
       {
         img: "https://lexiscleankitchen.com/wp-content/uploads/2016/04/LCK-Cookbook-Thai-BBQ-Salmon.jpg",
         title: 'Food',
         author: 'author',
         featured: true,
       },
       {
         img: "https://www.uncommongoods.com/images/items/23600/23696_1_640px.jpg",
         title: 'Food',
         author: 'author',
         featured: true,
       }
     ]
  }

  render() {
    return (
      <GridList cols={2.5}>
        {this.state.tileData.map(tile => (
          <GridListTile key={tile.img}>
            <img src={tile.img} alt={tile.title} />
            <GridListTileBar
              title={tile.title}
            />
          </GridListTile>
        ))}
      </GridList>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    entries: state.entry.entries
  }
}

export default withStyles(styles)(connect(
  mapStateToProps
)(Home));
