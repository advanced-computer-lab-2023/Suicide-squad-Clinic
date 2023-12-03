import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';


function CaseTableBody({ data }) {
  let navigate = useNavigate()
  const {username, id} = useParams();
  return (
    <>
      
    {data.Type && <th>{data.Type}</th>}
    {data.AnnualFee && <td>{data.AnnualFee}</td>}
    {data.DoctorSessionDiscount && <td>{data.DoctorSessionDiscount}</td>}
    {data.MedicineDiscount && <td>{data.MedicineDiscount}</td>}
    {data.FamilySubscriptionDiscount && <td>{data.FamilySubscriptionDiscount}</td>}

    {data.PaymentMethod && <td>{data.PaymentMethod}</td>}
    {data.RenewalDate && <td>{data.RenewalDate.substring(0,10)}</td>}
    {data.SubscriptionStartDate && <td>{data.SubscriptionStartDate.substring(0,10)}</td>}
    {data.SubscriptionEndDate && <td>{data.SubscriptionEndDate.substring(0,10)}</td>}

{data.AnnualFee &&
    <td className="py-3 text-align-center">
      <div className="d-flex flex-row">
      <button
        className={`green-txt mx-2 text-decoration-underline text-capitalize border-0 bg-transparent`}
        onClick={()=>navigate(`/healthPackageInfoFam/${username}/${data.Type}/${id}`)}
      >
        View
      </button>
      </div>
      </td>
}

    </>
  );
}

// function NoramlTableBody({ data }) {
//   let arr = [];
//   for (let key in data) arr.push(data[key]);

//   return (
//     <>
//       {arr.map((e) => (
//         <td>{e}</td>
//       ))}
//     </>
//   );
// }

function TableHealthPackagesFam({ tHead, data }) {
  console.log('table health packages', data)

  return (
    <div className="case-table card mt-4">
      <table className="table table-striped m-0">
        <thead>
          <tr className="text-capitalize">
            {tHead.map((e) => (
              <th scope="col">{e}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data
          .map((e) => (
            <tr className="text-capitalize">
                <CaseTableBody data={e} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableHealthPackagesFam;