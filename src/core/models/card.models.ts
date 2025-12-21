export interface YugiohCard {
  id: number;
  name: string;
  type: string;
  desc: string;
  race: string;
  archetype?: string;
  atk?: number;
  def?: number;
  level?: number;
  attribute?: string;
  card_images: {
    image_url: string;
    image_url_small: string;
  }[];
}
