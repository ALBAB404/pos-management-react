import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const TableSkeleton = ({trForItem = 6, tdForItem = 7}) => {
  const skeletonRows = Array.from({ length: trForItem });
  const skeletonColumn = Array.from({ length: tdForItem });
  return (
    <>
      {skeletonRows.map((_, index) => (
        <tr key={index}>
          {
            skeletonColumn.map((_, colmunIndex) => (
              <td key={colmunIndex}>
                <Skeleton
                  height={20}
                  width={50}
                  baseColor="#cfcfcf"
                  highlightColor="#000"
                />
              </td>
              ))
          }
        </tr>
      ))}
    </>
  );
};

export default TableSkeleton;
