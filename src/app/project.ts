// Imports
import { Exclude, Expose, Type } from 'class-transformer';

// Class type
@Exclude()
export class Project {
    @Expose()
    readonly id!: number;

    @Expose({ name: 'project_name' })
    readonly name!: string;

    @Expose()
    readonly description!: string;

    @Expose()
    @Type(() => String)
    readonly technologies!: string[];

    @Expose({ name: 'live_link' })
    readonly liveLink?: string;

    @Expose({ name: 'github_link' })
    readonly githubLink!: string;

    @Expose({ name: 'image_urls' })
    private readonly imageUrls!: Readonly<{
        landing: string;
        gallery: string[];
    }>;

    get landingImageUrl(): string {
        return this.imageUrls.landing;
    }

    get galleryImageUrls(): string[] {
        return this.imageUrls.gallery;
    }
}
