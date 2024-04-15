import { Avatar, Skeleton } from '@nextui-org/react';
import { IconUserFilled } from '@tabler/icons-react';
import { AsideDataColumn, H2Title } from '../../../../../components';
import { BUCKET_URL } from '../../../../../config/config';
import { UserFormBio, userInformation } from '../../../shared';

const UserBioInfo = ({ data, isLoading, action }) => {
  const { avatar } = data;

  const userData = userInformation(data);

  return (
    <Skeleton
      className="w-96 flex flex-col order-2 max-lg:order-1 mx-auto"
      isLoaded={!isLoading}
    >
      <aside className="w-96 flex flex-col order-2 max-lg:order-1 mx-auto">
        <div id="profileAside" className=" flex flex-col gap-5 pt-1">
          <Avatar
            isBordered
            color="primary"
            className="w-40 h-40 bg-white self-center"
            src={`${BUCKET_URL}/${avatar}`}
            showFallback
            fallback={<IconUserFilled className="size-20" />}
          />
          <div id="personalData" className="flex flex-col justify-start gap-4">
            <H2Title title="Información" />
            <AsideDataColumn dataColumn={userData} />
          </div>
        </div>
        <UserFormBio data={data} action={action} />
      </aside>
    </Skeleton>
  );
};

export default UserBioInfo;
