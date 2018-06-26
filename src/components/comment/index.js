import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/ModeEdit';
import AddIcon from '@material-ui/icons/Add';

class Comment extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            editingComment: false
        }
    }
    editingComment = (el) => {
        console.log(el);
      this.setState({editingComment: true})
    };
    cancelEditingComment = () => {
        this.setState({editingComment: false})
    };
    deleteComment = () => {
        this.setState({editingComment: false});
        this.props.deleteComment(this.props.el.id);
    };

    renderEdit () {
        return ([
            <TextField
                label="Комментарий"
                onChange={this.props.changeComment}
                InputLabelProps={{
                    shrink: true,
                }}/> ,
            <Button variant="fab" color="secondary" aria-label="edit" mini onClick={() => this.props.addComment(this.props.el.id)}><AddIcon /></Button> ,
            <Button variant="fab" aria-label="delete" mini onClick={this.cancelEditingComment}><DeleteIcon /></Button>
        ]);
    }

    renderComment () {
        return ([
            this.props.el.comment,  <div className={'comment-buttons'}>
            <Button variant="fab" aria-label="delete" mini onClick={this.cancelEditingComment}><EditIcon /></Button>
            <Button variant="fab" aria-label="delete" mini onClick={this.deleteComment}><DeleteIcon /></Button>
        </div>
        ]);
    }

    renderAdd () {
        return (
            <Button variant="fab" color="secondary" aria-label="edit" mini onClick={ () => this.editingComment(this.props.el)}><AddIcon /></Button>
        )
    }
    render () {
        return ( <div>
                {this.props.el.comment ?
                    this.renderComment() :
                    this.state.editingComment ?
                        this.renderEdit():
                        this.renderAdd()
                   }

            </div>
        )
    }
}

export default Comment;