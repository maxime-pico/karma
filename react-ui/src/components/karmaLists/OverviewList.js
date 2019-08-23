//@flow
import React from 'react'
import { CAUSE_AND_ACTS } from '../../services/constants'
import ItemOverview from './ItemOverview'
import { Link } from 'react-router-dom'

const OverviewList = ({ cause, grades, companyId }) => (
  <div>{/* className={'causeList'} */}
    {Object.keys(grades).map(
      identifier =>
        CAUSE_AND_ACTS[identifier] && (
          <div key={identifier}>
            <Link to={cause ? `act/${identifier}` : `cause/${identifier}`}>
              <ItemOverview
                identifier={identifier}
                grade={grades[identifier]}
              />
            </Link>
          </div>
        ),
    )}
  </div>
)

export default OverviewList
