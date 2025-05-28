import React from 'react'
import "../../styles/myPageHistory/reviewDelModal.css";
import btnCancelsrc from "/images/btnCancelBlack.png";

export default function ReviewDelModal(props) {

    return (
        <div className='reviewHistory-delModal'>
            <div className='delModal-container'>
                <div className='container-cancel'>
                    <img src={btnCancelsrc} alt="" className='cancel-btn'
                    onClick={()=>props.setModal(false)}
                    />    
                </div>
                <div className='container-text'>
                    <p className='text-title'>리뷰 삭제</p>
                    <p className='text-detail'>
                        해당 동작은 되돌릴 수 없습니다.<br/>
                        리뷰 삭제를 진행하려면 아래 버튼을<br/>
                        클릭해주세요.
                    </p>
                </div>
                <div className='container-btn'>
                    <div className='btn-cancel'>
                        <p className='cancel-text' onClick={()=>props.setModal(false)}>취소</p>
                    </div>
                    <div className='btn-delete'>
                        <p className='delete-text' onClick={() => props.handleDeleteReview(props.deleteReviewId)}>삭제</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
