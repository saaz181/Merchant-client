import React from 'react'
import TreeItem from '@material-ui/lab/TreeItem';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';


function treeView(props) {
    const renderOutCategory = (id, title, sub_category) => {
        return (
            <TreeItem nodeId={id} label={title}>
                {sub_category && sub_category.map(item => {
                    const {id, title} = item;
                    <TreeItem nodeId={id} label={title} />
                })}
            </TreeItem>
        );
    }
    
    
    
    const { category } = props;

    return (
    <TreeView 
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
    >
        {category.map(cat => renderOutCategory(cat.id, cat.title, cate.sub_category))}
    </TreeView>   
    );
}

export default treeView;
