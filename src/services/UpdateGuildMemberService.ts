import { GuildMember, Message } from 'discord.js';

import { parseMember } from '../utils/ParseMember';
import Member from '../models/Member';

async function handleGuildMemberElevation(
  targetMember: GuildMember | string,
  msg: Message
) {
  const [_, memberId] = await parseMember(targetMember);

  await Member.findOneAndUpdate(
    {
      userId: memberId,
    },
    {
      $set: {
        userRoleLvl: 1,
        wasUpdatedBy: msg.author.tag,
      },
    }
  );
}

async function handleGuildMemberDemotion(
  targetMember: GuildMember | string,
  msg: Message
) {
  const [_, memberId] = await parseMember(targetMember);

  await Member.findOneAndUpdate(
    {
      userId: memberId,
    },
    {
      $set: {
        userRoleLvl: 0,
        wasUpdatedBy: msg.author.tag,
      },
    }
  );
}

export { handleGuildMemberElevation, handleGuildMemberDemotion };