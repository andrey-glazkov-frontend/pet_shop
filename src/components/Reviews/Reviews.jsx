/* eslint-disable no-underscore-dangle */
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { api } from '../../helpers/Api'
import stylesRev from './reviews.module.scss'

export const REVIEWS_QUERY_KEY = ['REVIEWS_QUERY_KEY']

export function Reviews() {
  const { id } = useParams()
  const { data } = useQuery({
    queryKey: REVIEWS_QUERY_KEY.concat(id),
    queryFn: () => api.getReviews(id),
  })
  console.log(data)

  return (
    <section>
      <div className="container">
        <div className="row">
          {data?.map((review) => (
            <div className="col-md-3 col-xs-12">

              <div className={stylesRev.review}>
                <div className={stylesRev.review_head}>
                  <div className={stylesRev.reviewer_avatar}>
                    <img alt="" src={review.author.avatar} />
                  </div>
                  <div className={stylesRev.reviewer_name}>
                    <p>
                      {review.author.name}
                    </p>
                  </div>
                </div>
                <div>

                  <p>
                    Рейтинг:
                    {' '}
                    {review.rating}
                  </p>
                  <p>
                    {review.text}
                  </p>
                </div>
              </div>
            </div>

          ))}
        </div>
      </div>
    </section>
  )
}
