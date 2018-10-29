import { Asset, FileTypes } from 'app/entity';
import { IsBoolean, IsEnum, IsString, IsUrl } from 'class-validator';
import { Field, ID, InputType } from 'type-graphql';

@InputType()
export class AssetInput implements Partial<Asset> {
  @Field()
  @IsString()
  public name: string;

  @Field()
  @IsUrl()
  public location: string;

  @Field((type) => FileTypes)
  @IsEnum(FileTypes)
  public fileType: FileTypes;

  @Field()
  @IsBoolean()
  public success: boolean;

  @Field((type) => ID)
  public folderId: string;
}
