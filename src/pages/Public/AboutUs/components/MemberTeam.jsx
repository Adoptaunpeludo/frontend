import DoplaxCard from './DoplaxCard';
import JaderoCard from './JaderoCard';
import JmacostaCard from './JmacostaCard';
import PaquitoGRCard from './PaquitoGRCard';

export const MemberTeam = ({ member }) => {
  return (
    <>
      {member === 'jmacosta' && <JmacostaCard />}
      {member === 'jadero' && <JaderoCard />}
      {member === 'doplax' && <DoplaxCard />}
      {member === 'paquitoGR' && <PaquitoGRCard />}
    </>
  );
};
export default MemberTeam;
